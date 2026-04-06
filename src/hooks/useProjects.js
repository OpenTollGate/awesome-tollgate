import { useState, useEffect } from 'react';
import { parseFrontmatter } from '../utils/frontmatter';

function parseProject(slug, raw) {
  const { attributes, body } = parseFrontmatter(raw);
  return {
    slug,
    name: attributes.name || slug,
    description: attributes.description || '',
    image: attributes.image || null,
    tags: attributes.tags || [],
    links: attributes.links || [],
    body,
  };
}

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`${process.env.PUBLIC_URL}/projects/manifest.json`);
        if (!res.ok) throw new Error('Failed to load project manifest');
        const slugs = await res.json();

        const results = await Promise.all(
          slugs.map(async (slug) => {
            const mdRes = await fetch(`${process.env.PUBLIC_URL}/projects/${slug}.md`);
            if (!mdRes.ok) throw new Error(`Failed to load project: ${slug}`);
            const raw = await mdRes.text();
            return parseProject(slug, raw);
          })
        );

        if (!cancelled) {
          setProjects(results);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { projects, loading, error };
}

export function useProject(slug) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`${process.env.PUBLIC_URL}/projects/${slug}.md`);
        if (!res.ok) throw new Error(`Project not found: ${slug}`);
        const raw = await res.text();

        if (!cancelled) {
          setProject(parseProject(slug, raw));
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, [slug]);

  return { project, loading, error };
}

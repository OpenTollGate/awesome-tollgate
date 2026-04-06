import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useProject } from '../../hooks/useProjects';
import placeholderLogo from '../../assets/logo/TollGate_icon-White.png';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { project, loading, error } = useProject(slug);

  if (loading) {
    return (
      <PageContainer>
        <StateWrapper>
          <LoadingSpinner />
          <StateText>Loading project...</StateText>
        </StateWrapper>
      </PageContainer>
    );
  }

  if (error || !project) {
    return (
      <PageContainer>
        <StateWrapper>
          <StateTitle>Project not found</StateTitle>
          <StateText>{error || 'This project does not exist.'}</StateText>
          <BackButton onClick={() => navigate('/')}>Back to projects</BackButton>
        </StateWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackLink onClick={() => navigate('/')}>
        &larr; Back to projects
      </BackLink>

      <Header>
        <TitleRow>
          <ProjectImage
            src={project.image || placeholderLogo}
            alt={project.name}
            $isPlaceholder={!project.image}
          />
          <ProjectName>{project.name}</ProjectName>
        </TitleRow>
        <ProjectDescription>{project.description}</ProjectDescription>

        {project.tags.length > 0 && (
          <TagList>
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagList>
        )}

        {project.links.length > 0 && (
          <LinkList>
            {project.links.map((link, i) => (
              <LinkButton
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label.toLowerCase() === 'repository' ? `\uD83D\uDD00 ${link.label}` : link.label}
              </LinkButton>
            ))}
          </LinkList>
        )}
      </Header>

      <MarkdownContent>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {project.body}
        </ReactMarkdown>
      </MarkdownContent>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

const StateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing['3xl']} ${props => props.theme.spacing.lg};
  gap: ${props => props.theme.spacing.md};
  text-align: center;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${props => props.theme.colors.border};
  border-top: 3px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const StateTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.xl};
  margin: 0;
`;

const StateText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.md};
  margin: 0;
`;

const BackLink = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.md};
  cursor: pointer;
  padding: 0;
  margin-bottom: ${props => props.theme.spacing.xl};
  display: inline-block;

  &:hover {
    text-decoration: underline;
  }
`;

const BackButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.radii.md};
  font-size: ${props => props.theme.fontSizes.md};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;

const Header = styled.div`
  margin-bottom: ${props => props.theme.spacing['2xl']};
  padding-bottom: ${props => props.theme.spacing.xl};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ProjectImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: ${props => props.theme.radii.lg};
  object-fit: contain;
  flex-shrink: 0;
  opacity: ${props => props.$isPlaceholder ? 0.7 : 1};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 40px;
    height: 40px;
  }
`;

const ProjectName = styled.h1`
  margin: 0;
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes['2xl']};
  }
`;

const ProjectDescription = styled.p`
  margin: 0 0 ${props => props.theme.spacing.lg} 0;
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Tag = styled.span`
  background-color: rgba(255, 107, 53, 0.15);
  color: ${props => props.theme.colors.primaryLight};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.radii.full};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const LinkList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
`;

const LinkButton = styled.a`
  display: inline-block;
  background-color: ${props => props.theme.colors.cardBackground};
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.radii.md};
  font-size: ${props => props.theme.fontSizes.sm};
  text-decoration: none;
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const MarkdownContent = styled.div`
  color: ${props => props.theme.colors.text};
  line-height: 1.8;

  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme.colors.text};
    margin-top: ${props => props.theme.spacing.xl};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  h2 {
    font-size: ${props => props.theme.fontSizes['2xl']};
    border-bottom: 1px solid ${props => props.theme.colors.border};
    padding-bottom: ${props => props.theme.spacing.sm};
  }

  h3 {
    font-size: ${props => props.theme.fontSizes.xl};
  }

  p {
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.textSecondary};
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  code {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 0.2em 0.4em;
    border-radius: ${props => props.theme.radii.sm};
    font-size: 0.9em;
  }

  pre {
    background-color: rgba(0, 0, 0, 0.3);
    padding: ${props => props.theme.spacing.lg};
    border-radius: ${props => props.theme.radii.lg};
    overflow-x: auto;

    code {
      background: none;
      padding: 0;
    }
  }

  ul, ol {
    padding-left: ${props => props.theme.spacing.xl};
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.textSecondary};
  }

  li {
    margin-bottom: ${props => props.theme.spacing.xs};
  }

  blockquote {
    border-left: 3px solid ${props => props.theme.colors.primary};
    padding-left: ${props => props.theme.spacing.lg};
    margin: ${props => props.theme.spacing.lg} 0;
    color: ${props => props.theme.colors.textSecondary};
    font-style: italic;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: ${props => props.theme.spacing.lg};
  }

  th, td {
    border: 1px solid ${props => props.theme.colors.border};
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    text-align: left;
  }

  th {
    background-color: rgba(255, 255, 255, 0.05);
    font-weight: ${props => props.theme.fontWeights.semibold};
  }

  img {
    max-width: 100%;
    border-radius: ${props => props.theme.radii.md};
  }

  hr {
    border: none;
    border-top: 1px solid ${props => props.theme.colors.border};
    margin: ${props => props.theme.spacing.xl} 0;
  }
`;

export default ProjectDetailPage;

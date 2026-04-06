import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Card, { CardHeader, CardContent, CardFooter } from '../common/Card';
import placeholderLogo from '../../assets/logo/TollGate_icon-White.png';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/project/${project.slug}`);
  };

  const handleLinkClick = (e, url) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const visibleLinks = (project.links || []).slice(0, 3);
  const imageSrc = project.image || placeholderLogo;

  return (
    <StyledCard hover onClick={handleCardClick}>
      <CardHeader>
        <TitleRow>
          <ProjectImage src={imageSrc} alt={project.name} $isPlaceholder={!project.image} />
          <ProjectName>{project.name}</ProjectName>
        </TitleRow>
      </CardHeader>

      <CardContent>
        <Description>{project.description}</Description>
        {project.tags.length > 0 && (
          <TagList>
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagList>
        )}
      </CardContent>

      {visibleLinks.length > 0 && (
        <StyledFooter>
          {visibleLinks.map((link, i) => (
            <LinkChip
              key={i}
              onClick={(e) => handleLinkClick(e, link.url)}
              title={link.url}
            >
              {link.label.toLowerCase() === 'repository' ? `\uD83D\uDD00 ${link.label}` : link.label}
            </LinkChip>
          ))}
        </StyledFooter>
      )}
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const ProjectImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.radii.md};
  object-fit: contain;
  flex-shrink: 0;
  opacity: ${props => props.$isPlaceholder ? 0.7 : 1};
`;

const ProjectName = styled.h3`
  margin: 0;
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
`;

const Description = styled.p`
  margin: 0 0 ${props => props.theme.spacing.md} 0;
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.5;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
`;

const Tag = styled.span`
  background-color: rgba(255, 107, 53, 0.15);
  color: ${props => props.theme.colors.primaryLight};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.radii.full};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const StyledFooter = styled(CardFooter)`
  margin-top: auto;
  justify-content: flex-start;
  gap: ${props => props.theme.spacing.sm};
`;

const LinkChip = styled.button`
  background-color: ${props => props.theme.colors.cardBackground};
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.radii.md};
  font-size: ${props => props.theme.fontSizes.sm};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
    color: white;
  }
`;

export default ProjectCard;

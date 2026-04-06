import React from 'react';
import styled from 'styled-components';
import { useProjects } from '../../hooks/useProjects';
import ProjectGrid from './ProjectGrid';

const ProjectsOverview = () => {
  const { projects, loading, error } = useProjects();

  if (loading) {
    return (
      <Container>
        <StateWrapper>
          <LoadingSpinner />
          <StateText>Loading projects...</StateText>
        </StateWrapper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <StateWrapper>
          <ErrorTitle>Unable to load projects</ErrorTitle>
          <StateText>{error}</StateText>
        </StateWrapper>
      </Container>
    );
  }

  if (projects.length === 0) {
    return (
      <Container>
        <StateWrapper>
          <StateTitle>No projects found</StateTitle>
          <StateText>No projects are available yet.</StateText>
        </StateWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <ResultsText>
        {projects.length} project{projects.length !== 1 ? 's' : ''}
      </ResultsText>
      <ProjectGrid projects={projects} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
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
  font-weight: ${props => props.theme.fontWeights.semibold};
  margin: 0;
`;

const ErrorTitle = styled(StateTitle)`
  color: ${props => props.theme.colors.error};
`;

const StateText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.md};
  margin: 0;
  max-width: 500px;
  line-height: 1.6;
`;

const ResultsText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.sm};
  margin: 0;
  padding-top: ${props => props.theme.spacing.lg};
`;

export default ProjectsOverview;

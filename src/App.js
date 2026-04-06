import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

import { theme } from './styles/theme';
import Background from './components/common/Background';
import Header from './components/layout/Header';
import ProjectsOverview from './components/projects/ProjectsOverview';
import ProjectDetailPage from './components/projects/ProjectDetailPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Background />
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <MainContent>
                <ProjectsOverview />
              </MainContent>
            }
          />
          <Route
            path="/project/:slug"
            element={<ProjectDetailPage />}
          />
        </Routes>
      </AppContainer>
    </ThemeProvider>
  );
};

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  position: relative;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    overflow-x: hidden;
    max-width: 100vw;
    box-sizing: border-box;
  }
`;

const MainContent = styled.main`
  padding: 0 ${props => props.theme.spacing.lg};
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing.md};
    overflow-x: hidden;
    width: 100%;
    box-sizing: border-box;
    min-width: 0;
  }
`;

export default App;

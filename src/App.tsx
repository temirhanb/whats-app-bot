import {createTheme, styled, ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router";
import {AuthPage, ChatPage} from "./pages";

function App() {

  const theme = createTheme({
    colorSchemes: {
      dark: true,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Routes>
          <Route path={"/"} element={<AuthPage/>}/>
          <Route path={"/chat"} element={<ChatPage/>}/>
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;

const Container = styled("div")`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
`;

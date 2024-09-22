// img import format: import reactLogo from './assets/react.svg'

/* Required Pages and components:
  
# Pages: 
  * Home:
    - Scene
  * Customizer
*/
import Canvas from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';

export default function App() {
  return (
    <main className='app transition-all ease-in'>
      <Home />
      <Canvas />
      <Customizer />
    </main>
  );
}

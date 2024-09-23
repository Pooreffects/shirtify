// img import format: import reactLogo from './assets/react.svg'

/* Required Pages and components:
  
# Pages: 
  * Home:
    - Scene
  * Customizer
*/
import Customizer from './pages/Customizer';
import Home from './pages/Home';
import Scene from './scene';

export default function App() {
  return (
    <main className='app transition-all ease-in'>
      <Home />
      <Scene />
      <Customizer />
    </main>
  );
}

// components
import Navbar from './Navbar';
import CartContainer from './CartContainer';
import { useGlobalContext } from './AppContext';

function App() {
  const { state } = useGlobalContext();

  if (state.isLoading) {
    return (
      <main>
        <div className="loading" style={{ marginTop: '6rem' }}></div>
      </main>
    );
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;

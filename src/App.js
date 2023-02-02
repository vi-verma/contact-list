import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import AddContact from './pages/add-contact';
import ContactList from './pages/contactList/ContactList';
import EditContact from './pages/edit-contact/EditContact';

function App() {
  return (
    <div className="App">
        <Routes>
          {/* <Layout > */}
        <Route path="/" element={<Layout >  <ContactList/> </Layout>} />
        <Route path="/add-contact" element={ <AddContact /> } />
        <Route path="edit-contact" element={ <EditContact/> } />
        {/* </Layout> */}
      </Routes>
    </div>
  );
}

export default App;

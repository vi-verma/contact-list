import { Route, Routes } from 'react-router-dom';
import './App.css';
import Card from './components/card/Card';
import UserDetailCard from './components/detailCard/UserDetailCard';
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
     {/* <Card /> */}
     {/* <UploadImage /> */}
      {/* <AddContact /> */}
     {/* <UserDetailCard />  */}
    </div>
  );
}

export default App;

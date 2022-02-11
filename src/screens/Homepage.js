import logo from '../logo.svg';
import '../App.css';
import Header from "../Partials/Header";
import {Button, Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import '../lib/api';
import {getWebsites} from "../lib/api";


function Homepage({ navigation }) {
    const [websites, setWebsites] = useState([]);
    useEffect(() => {
        getWebsites().then((data) => {
            setWebsites(data);
        })
    }, []);

    const handleWebsiteClick = (website) => {
        navigation.navigate('Website', {website: website});
    }

    return (
        <div className={'body'}>
            <Header title={"MATM Website Admin"} />
            <Container className={"content-container pt-3"}>
              <table className={'websites-table'}>
                  {websites.map((website, index) => {
                      return (
                          <tr key={index} className={(index % 2 ? 'even' : 'odd')}>
                              <td>{website}</td>
                              <td><Button onClick={() => handleWebsiteClick(website)} >Edit</Button></td>
                          </tr>
                      )
                  })}
              </table>
            </Container>
        </div>
    );
}

export default Homepage;

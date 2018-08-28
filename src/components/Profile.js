import React, { Component } from 'react';
import Facebook from '../components/Facebook';
import '../components/Profile.css';

// Tämä sivu voisi olla profiilisivu, eli kun käyttäjä on autentoikoinut niin tässä näkyy
// tiedot, kuten nimi, maili ja kuva. Autentikoinnin jälkeen esim. redirectaisi tänne ja tänne pääsisi napista.

class Logged extends Component {
    
    constructor(props) {
        super(props);
    }

    render() { 
        return (
            <div className="profile">
                <br /><h2>Profiili</h2><br />
                <Facebook />
            </div>
        );
    }
}

export default Logged;
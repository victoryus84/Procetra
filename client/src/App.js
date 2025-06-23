//import React, { useContext, useEffect, useState } from 'react';
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
//import { Context } from "./index";
import { useAuthCheck } from './hooks/useAuthCheck';
import { Spinner } from "react-bootstrap";

const App = observer(() => {
    const loading = useAuthCheck();

    if (loading) {
        return <Spinner animation={"grow"} />
    }

    return (
        <>
            <NavBar />
            <AppRouter />
        </>
    );
});

export default App;

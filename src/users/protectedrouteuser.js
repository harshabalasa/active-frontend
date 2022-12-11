import React, { useState, useEffect } from 'react';


export default function UserProtectedRoute({ children }) {
    if (localStorage.getItem('userlog'))
        return (< div > {children} </div>)
    else {
        window.location.href = "/login";
    }
}
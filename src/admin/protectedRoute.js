import React, { useState, useEffect } from 'react';


export default function AdminProtectedRoute({ children }) {
    if (localStorage.getItem('adminlog'))
        return (< div > {children} </div>)
    else
        window.location.href = "/login";
}
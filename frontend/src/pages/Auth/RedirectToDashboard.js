import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLoaderData } from 'react-router-dom'

const RedirectToDashboard = () => {
    const { isLoggedIn, userRole } = useSelector(state => state.profile)
    if (!isLoggedIn) <Navigate to="/login" />
    return (
        <Navigate to={`/${userRole}`} />
    )
}

export default RedirectToDashboard
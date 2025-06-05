import React from 'react'
import { LandingPage } from '@components/organisms/LandingPage'

const Home: React.FC = () => <LandingPage />

(Home as any).noLayout = false

export default Home

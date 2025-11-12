import React, { useState } from 'react'
import { LandingPage } from '../components/organisms/LandingPage/LandingPage'
import { Modal, ModalHeader, ModalBody, Button } from 'flowbite-react'
import { LoginForm } from '../features/auth/components/LoginForm/LoginForm'
import { SignupForm } from '../features/auth/components/SignupForm/SignupForm'

const Home: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  return (
    <>
      <LandingPage
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
      />
      <Modal show={showLogin} onClose={() => setShowLogin(false)}>
        <ModalHeader>Sign In</ModalHeader>
        <ModalBody>
          <LoginForm onSubmit={() => setShowLogin(false)} loading={false} error={null} onGoogle={() => {}} />
          <div className="mt-4 text-center">
            <span>Don't have an account? </span>
            <Button color="light" onClick={() => { setShowLogin(false); setShowSignup(true); }}>Sign Up</Button>
          </div>
        </ModalBody>
      </Modal>
      <Modal show={showSignup} onClose={() => setShowSignup(false)}>
        <ModalHeader>Sign Up</ModalHeader>
        <ModalBody>
          <SignupForm onSubmit={() => setShowSignup(false)} loading={false} error={null} />
          <div className="mt-4 text-center">
            <span>Already have an account? </span>
            <Button color="light" onClick={() => { setShowSignup(false); setShowLogin(true); }}>Sign In</Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

(Home as any).noLayout = false

export default Home

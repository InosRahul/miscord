import { useState } from 'react';
import { Form, Formik } from 'formik';
import { validationSchema, defaultValues } from './signupFormConfig';
import { FormField } from 'components';
import { useHistory } from 'react-router-dom';
export const Signup = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState('');
  const signup = ({ email, userName, password }, { setSubmitting }) => {
    console.log('values', email, userName, password);
  };
  return (
    <div className="auth-form">
      <h1>Signup form</h1>
      <Formik
        onSubmit={signup}
        validateOnMount={true}
        validationSchema={validationSchema}
        initialValues={defaultValues}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField identifier="userName" label="UserName"></FormField>
            <FormField
              identifier="email"
              label="Email"
              type="email"
            ></FormField>
            <FormField
              identifier="password"
              label="Password"
              type="password"
            ></FormField>
            <FormField
              identifier="verifyPassword"
              label="Verfiy Password"
              type="password"
            ></FormField>
            <div className="auth-link-container">
              Existing User?{' '}
              <span className="auth-link" onClick={() => history.push('login')}>
                Log in !
              </span>
            </div>
            <button disabled={isSubmitting || !isValid} type="submit">
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
      {!!serverError && <div className="error">{serverError}</div>}
    </div>
  );
};

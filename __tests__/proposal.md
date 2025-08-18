# Proposal for Unit Testing and Integration Testing in codebase

## Overview
This project is based on form validation and submission to local storage. User will submit a product feedback form and the data will be stored in local storage.

## Project Structure
1. Homepage - <Home/>
2. Form Page - <Form/>
   - Form validation
   - Form submission
   - Form reset
3. Feedback page (local storage) - <FeedbackList/>
   - Fetch data from local storage
   - Display feedbacks
   - Erase local storage


# Unit Testing
- Testing each component that appears to user's eyes
- Ensuring that the components render correctly
- Validating that the components behave as expected
- also what should not be rendered and what should not be in the components

# Integration Testing
- focus on form validation and submission
- rendering the form with complete data
- rendering only required fields
- reset form after submission
- require mocking functions to simulate user interactions

![alt text](<CleanShot 2568-08-18 at 10.54.02@2x.png>)
![alt text](<CleanShot 2568-08-18 at 03.38.03@2x.png>)
![alt text](<CleanShot 2568-08-18 at 10.53.40@2x.png>)

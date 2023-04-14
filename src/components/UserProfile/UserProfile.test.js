import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserProfile from './UserProfile';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';

describe('UserProfile component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        const mockAuthObject = { currentUser: { displayName: 'test', email: 'test@test.com', phoneNumber: '1234567890' } };
        const mockSetShowProfile = jest.fn();
        render(<UserProfile authObject={mockAuthObject} setShowProfile={mockSetShowProfile} />);
    });

    it('should render the user profile form', () => {
        render(<UserProfile authObject={{ currentUser: {} }} />);
        const displayNameInput = screen.getByLabelText(/display name/i);
        const emailInput = screen.getByLabelText(/email/i);
        const phoneNumberInput = screen.getByLabelText(/phone number/i);
        const saveButton = screen.getByRole('button', { name: /save/i });
        const closeButton = screen.getByRole('button', { name: /close/i });
    
        expect(displayNameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(phoneNumberInput).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();
        expect(closeButton).toBeInTheDocument();
    });

    
    it('should update the user profile when the "Save" button is clicked', async () => {
        const mockSetShowProfile = jest.fn();
        const mockUpdateProfile = jest.fn();
        const mockCurrentUser = {
          displayName: 'Test User',
          email: 'testuser@example.com',
          phoneNumber: '+1234567890',
        };
        const mockAuthObject = {
          currentUser: mockCurrentUser,
        };
        jest.spyOn(React, 'useState').mockImplementationOnce(() => [
          mockCurrentUser.displayName,
          jest.fn(),
        ]);
        jest.spyOn(React, 'useState').mockImplementationOnce(() => [
          mockCurrentUser.email,
          jest.fn(),
        ]);
        jest.spyOn(React, 'useState').mockImplementationOnce(() => [
          mockCurrentUser.phoneNumber,
          jest.fn(),
        ]);
        jest.spyOn(React, 'useState').mockImplementationOnce(() => [
          mockSetShowProfile,
          jest.fn(),
        ]);
        jest.spyOn(React, 'useState').mockImplementationOnce(() => [
          true,
          jest.fn(),
        ]);
        jest.spyOn(React, 'useState').mockImplementationOnce(() => [
          mockAuthObject,
          mockUpdateProfile,
        ]);
        render(<UserProfile authObject={mockAuthObject} setShowProfile={mockSetShowProfile} updateProfile={mockUpdateProfile} />);
        const displayNameInput = screen.getByLabelText(/display name/i);
        const emailInput = screen.getByLabelText(/email/i);
        const phoneNumberInput = screen.getByLabelText(/phone number/i);
        const saveButton = screen.getByRole('button', { name: /save/i });
      
        await act(async () => {
            userEvent.clear(displayNameInput);
            userEvent.type(displayNameInput, 'New User');
            userEvent.clear(emailInput);
            userEvent.type(emailInput, 'newuser@example.com');
            userEvent.clear(phoneNumberInput);
            userEvent.type(phoneNumberInput, '+0987654321');
            fireEvent.click(saveButton);
        });
      
        console.log('before waitFor');
      
        await act(async () => {
            await waitFor(() => {
              expect(mockUpdateProfile).toHaveBeenCalledWith({
                displayName: 'New User',
                email: 'newuser@example.com',
                phoneNumber: '+0987654321',
              });
            }, { timeout: 5000 });
        });
      
        console.log('after waitFor');
      
        expect(mockSetShowProfile).toHaveBeenCalledWith(false);
    });

    it('should close the user profile module when the "Close" button is clicked', () => {
        const mockSetShowProfile = jest.fn();
        render(<UserProfile authObject={{ currentUser: {} }} setShowProfile={mockSetShowProfile} />);
        const closeButton = screen.getByRole('button', { name: /close/i });
        act(() => {
            fireEvent.click(closeButton);
            expect(mockSetShowProfile).toHaveBeenCalledWith(false);
        });
    });
})
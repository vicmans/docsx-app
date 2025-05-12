import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { vi } from 'vitest';
import { Upload } from './Upload';

vi.mock('axios', () => {
	const mockAxios = {
		get: vi.fn(),
		post: vi.fn(),
		create: vi.fn(() => mockAxios), // Mock create to return the mock instance
	};
	return {
		default: mockAxios,
	};
});

describe('Upload', () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});
	it('renders the upload component', async () => {
		const spy = vi.spyOn(axios, 'post').mockResolvedValue({
      data: {
				filename: 'any',
				timestamps: 'Date',
				filesize: 'any',
				status: 'uploaded',
			},
    });
		render(<Upload />)
    const fileInput = screen.getByTestId('upload');
    const file = new File(['file content'], 'test-file.docx');
    await userEvent.upload(fileInput, file);
		const submitButton = screen.getByTestId('upload-button');
    await userEvent.click(submitButton);
		// Wait for the upload to finish
		await waitFor(() => expect(spy).toHaveBeenCalled())
    await waitFor(() => screen.getByTestId('results'));
    expect(screen.getByText(/Uploaded successfully/)).toBeInTheDocument();
	})

	it('should add file', async () => {
	})
})
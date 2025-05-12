import { render, screen, waitFor } from '@testing-library/react'
import { Dashboard } from './Dashboard'
import { vi } from 'vitest';
import axios from 'axios';
import { beforeEach } from 'node:test';
import userEvent from '@testing-library/user-event';

const files = [
	{
		"id": 1,
		"filename": "file2.docx",
		"timestamps": "2025-05-10T03:52:52.916Z",
		"filesize": 4649979,
		"status": "uploaded"
	},
	{
		"id": 2,
		"filename": "file1.docx",
		"timestamps": "2025-05-11T16:29:10.281Z",
		"filesize": 162676,
		"status": "uploaded",
	}
];

vi.mock('axios', () => {
	const mockAxios = {
		get: vi.fn(),
		post: vi.fn(),
		put: vi.fn(),
		create: vi.fn().mockReturnThis(),
	};
	return {
		default: mockAxios,
	};
});

describe('Dashboard', () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	it('should show No data when no Data', async () => {
		vi.spyOn(axios, 'get').mockResolvedValue({
      data: {files: []},
    });
		render(<Dashboard />)
		await waitFor(() => screen.getByText('No data'));
		expect(screen.getByText('No data')).toBeInTheDocument();
	})

	it('should show fetched files', async () => {
		vi.spyOn(axios, 'get').mockResolvedValue({
      data: {files},
    });
		render(<Dashboard />)
		await waitFor(() => screen.getByText('file1.docx'));
		expect(screen.getByText('file1.docx')).toBeInTheDocument();
		expect(screen.getByText('file2.docx')).toBeInTheDocument();
	})

	it('should update the accept status', async () => {
		const newFiles = [...files];
		newFiles[0] = {
			...files[0],
			"status": "accepted"
		}
		vi.spyOn(axios, 'get').mockResolvedValue({
      data: {files: newFiles},
    });
		render(<Dashboard />)
		await waitFor(() => screen.getByText('file1.docx'));
		const acceptButton = screen.getAllByText('Accept')[0];
		userEvent.click(acceptButton);
		await waitFor(() => screen.getByText('file1.docx'));
		expect(screen.getByText('accepted')).toBeInTheDocument();
	})

	it('should update the Reject status', async () => {
		const newFiles = [...files];
		newFiles[0] = {
			...files[0],
			"status": "rejected"
		}
		vi.spyOn(axios, 'get').mockResolvedValue({
      data: {files: newFiles},
    });
		render(<Dashboard />)
		await waitFor(() => screen.getByText('file1.docx'));
		const rejectButton = screen.getAllByText('Reject')[0];
		userEvent.click(rejectButton);
		
		await waitFor(() => screen.getByText('file1.docx'));
		expect(screen.getByText('rejected')).toBeInTheDocument();
	})
})
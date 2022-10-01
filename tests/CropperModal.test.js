process.env.CATEGORY_URL = 'https://storage.googleapis.com/tech-blog-static/'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CropperModal from "../pages/components/CropperModal";
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux';
import store from '../store';
import { act } from 'react-dom/test-utils';

const tag = {id: 1, name: 'html', category: {name: 'Language'}}
describe('The CropperModal component', () => {

  test('put image in input', async() => {
    const getSrc = () => {
      console.log('Hello')
    }
    render(
      <Provider store={store}>
        <CropperModal setSrc={getSrc} />
      </Provider>
    );
    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    let inputFile = screen.getByLabelText("cropImage");
    await waitFor(() =>
      fireEvent.change(inputFile, {
        target: { files: [file] },
      })
    );
    expect(inputFile.files[0].name).toBe("chucknorris.png");
    expect(inputFile.files.length).toBe(1);
  });

  test('put image in input', async() => {
    const getSrc = () => {
      console.log('Hello')
    }
    render(
      <Provider store={store}>
        <CropperModal setSrc={getSrc} />
      </Provider>
    );
    const file = new File(['Hello'], 'inoueryo.png', { type: "image/png" });
    let inputFile = screen.getByLabelText("cropImage");
    const button = screen.queryByText('切り取り');
    expect(button).not.toBeInTheDocument();
    await act(async () => {
      await waitFor(() => {
        userEvent.upload(inputFile, file);
      });
    });
    await waitFor(async() => {
      const button = screen.queryByText('切り取り');
      expect(button).toBeInTheDocument();
    });
  });

})

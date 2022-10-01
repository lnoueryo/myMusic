process.env.CATEGORY_URL = 'https://storage.googleapis.com/tech-blog-static/'
import { findAllByAltText, fireEvent, render,screen, waitFor } from '@testing-library/react'
import AlertDialog from "../pages/components/AlertDialog";
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux';
import store from '../store';
import { act } from 'react-dom/test-utils';

const EXCUTE_BUTTON_TEXT = 'Yes'
const CONTENT_TEXT = 'します。よろしいですか？'
const SUCCESS_TEXT = '更新しました'
const FAILURE_TEXT = '更新に失敗しました'
describe('The AlertDialog component', () => {

  test('check open dialog', () => {
  const buttonText = 'ブログを更新'
  const updateFunc = () => {
    return true;
  }
    render(
      <Provider store={store}>
        <AlertDialog buttonText={buttonText} func={updateFunc} />
      </Provider>
    );
    const button = screen.getByText(buttonText);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    const content = screen.getByText(buttonText + CONTENT_TEXT);
    expect(content).toBeInTheDocument();
    const excuteButton = screen.getByText(EXCUTE_BUTTON_TEXT);
    expect(excuteButton).toBeInTheDocument();
  });

  test('check success excute', async() => {
  const buttonText = 'ブログを更新'
  const updateFunc = () => {
    return true;
  }
    render(
      <Provider store={store}>
        <AlertDialog buttonText={buttonText} func={updateFunc} />
      </Provider>
    );
    const button = screen.getByText(buttonText);
    fireEvent.click(button);
    const excuteButton = screen.getByText(EXCUTE_BUTTON_TEXT);
    fireEvent.click(excuteButton);
    await waitFor(() => {
      const snackbar = screen.queryByText(SUCCESS_TEXT);
      expect(snackbar).toBeInTheDocument();
    });
  });

  test('check fail excute', async() => {
  const buttonText = 'ブログを更新'
  const updateFunc = () => {
    return false;
  }
    render(
      <Provider store={store}>
        <AlertDialog buttonText={buttonText} func={updateFunc} />
      </Provider>
    );
    const button = screen.getByText(buttonText);
    fireEvent.click(button);
    const excuteButton = screen.getByText(EXCUTE_BUTTON_TEXT);
    fireEvent.click(excuteButton);
    await waitFor(() => {
      const snackbar = screen.queryByText(FAILURE_TEXT);
      expect(snackbar).toBeInTheDocument();
    });
  });

})

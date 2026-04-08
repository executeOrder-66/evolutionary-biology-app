import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuizCheckpoint, { QuizQuestion } from '../simulation/QuizCheckpoint';

const sampleQuiz: QuizQuestion = {
  atStep: 1,
  question: 'What drives natural selection?',
  options: [
    'Random chance alone',
    'Differential survival and reproduction',
    'Intentional effort by organisms',
  ],
  correctIndex: 1,
  explanation: 'Natural selection acts through differential survival and reproduction.',
};

describe('QuizCheckpoint', () => {
  it('renders the question and all options', () => {
    render(<QuizCheckpoint quiz={sampleQuiz} />);

    expect(screen.getByText(sampleQuiz.question)).toBeInTheDocument();
    for (const option of sampleQuiz.options) {
      expect(screen.getByText(option)).toBeInTheDocument();
    }
  });

  it('clicking an option reveals the explanation', () => {
    render(<QuizCheckpoint quiz={sampleQuiz} />);

    expect(screen.queryByText(sampleQuiz.explanation)).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(sampleQuiz.options[1]));

    expect(screen.getByText(sampleQuiz.explanation)).toBeInTheDocument();
  });

  it('correct answer shows "✓ Correct!" message', () => {
    render(<QuizCheckpoint quiz={sampleQuiz} />);

    fireEvent.click(screen.getByText(sampleQuiz.options[1]));

    expect(screen.getByText('✓ Correct!')).toBeInTheDocument();
  });

  it('wrong answer shows "✗ Not quite." message', () => {
    render(<QuizCheckpoint quiz={sampleQuiz} />);

    fireEvent.click(screen.getByText(sampleQuiz.options[0]));

    expect(screen.getByText('✗ Not quite.')).toBeInTheDocument();
  });

  it('options are disabled after answering', () => {
    render(<QuizCheckpoint quiz={sampleQuiz} />);

    fireEvent.click(screen.getByText(sampleQuiz.options[0]));

    const buttons = screen.getAllByRole('button');
    for (const button of buttons) {
      expect(button).toBeDisabled();
    }
  });
});

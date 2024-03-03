"use client";
import { TypeAnimation } from "react-type-animation";

export interface AnswerProps {
  Answer: string;
}
const ExampleComponent = ({ Answer }: AnswerProps) => {
  return (
    <TypeAnimation
      className="text-left"
      sequence={[Answer, 100]}
      wrapper="span"
      speed={60}
    />
  );
};

export default ExampleComponent;

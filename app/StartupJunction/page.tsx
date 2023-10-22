import React, { FunctionComponent } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface OwnProps {}

type Props = OwnProps;

const StartupJunction: FunctionComponent<Props> = (props) => {
  return (
    <>
      <h1 className={"text-blue-700 font-bold"}>Balveer </h1>
      <Button>Button</Button>
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </Popover>
    </>
  );
};

export default StartupJunction;

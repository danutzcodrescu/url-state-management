import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { data } from "@/app/api/fixtures";

interface Props {
  data: (typeof data)[0];
}

export function SearchCard(props: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {props.data.Brand} {props.data.Model}
        </CardTitle>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <div>
              <strong>Processor:</strong> {props.data.Processor}
            </div>
            <div>
              <strong>RAM:</strong> {props.data.RAM}GB
            </div>
            <div>
              <strong>Storage:</strong> {props.data.Storage}GB
            </div>
            <div>
              <strong>Display:</strong> {props.data["Display Size (inches)"]}{" "}
              inch
            </div>
            <div>
              <strong>Camera:</strong> {props.data["Camera"]}
            </div>
            <div>
              <strong>Battery</strong> {props.data.Battery}
            </div>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export interface Component {
  name: string;
  description: string;
  files: string[];
  dependencies: Record<string, string>;
  baseComponents: string[];
  category: "custom" | "widget";
  tags: string[];
}

export interface ComponentWithKey extends Component {
  key: string;
}

export interface Component {
  name: string;
  files: string[];
  dependencies: Record<string, string>;
  baseComponents: string[];
  category: "custom" | "widget";
}

export interface ComponentWithKey extends Component {
  key: string;
}

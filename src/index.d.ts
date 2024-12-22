type Variable = string | number | boolean | null;
type VariableUpdate = [string, Variable]

type Text = string | string[];

interface AllModifiers {
  start: string;
  delay: number;
  SET: VariableUpdate | VariableUpdate[];
  CHANGE: VariableUpdate | VariableUpdate[];
  TOGGLE: string[];
  RENDER_CONDITION: string;
  styles: { [key: string]: { [key: string]: string } ; };
  overwrite: Partial<AllModifiers>;
}

type Modifiers = Partial<AllModifiers>;

interface Dialogue {
  text: Text;
  narrator?: string;
  modifiers?: Modifiers;
  [key: string]: any;
}

interface Choice {
  text: Text;
  link: string;
  modifiers?: Modifiers;
  [key: string]: any;
}

interface Settings extends Modifiers {
  delay: number; // defaults to zero
  savedNames: Record<string, string>;
  vars: Record<string, Variable>;
}

interface Scene {
  text: [Dialogue | Choice];
  modifiers?: Modifiers;
}

interface Script {
  [key: string]: Scene;
}

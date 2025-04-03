//Sorted by alphabetical order

interface ActionsIconsProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: (e: React.FormEvent) => Promise<void>;
  onCancel: () => void;
}

interface BeltData {
  id?: number;
  name: string;
  rank_order: number;
  program_description: string;
}

interface BeltContextProps {
  belts: BeltData[];
}

interface BeltsProps {
  belts: BeltData[];
  updateSelectedBelt: (rank_order: number) => void;
  selectedBeltRank: number | null | undefined;
  isSelectable: boolean;
}

interface CategoryData {
  id?: number;
  name: string;
  slug?: string;
  signification: string;
}

interface Credentials {
  email: string;
  password: string;
}
interface DarkModeContextType {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}
interface DarkModeProviderProps {
  children: ReactNode;
}

interface KataData {
  id?: number | null;
  rank_order: string | number | undefined;
  defense: string;
  technique_id: number | null;
  belt_id: number | null;
  technique_name?: string;
  technique_signification?: string;
}
interface KataFormProps {
  belts: BeltData[];
  categories: CategoryData[];
  techniques: TechniqueData[];
  children: ReactNode;
  defaultValue: KataData;
  onSubmit: (kata: KataData) => void;
  errors?: FormErrors;
  sequence: string;
}

interface KataNoteFormProps {
  toAdd: boolean;
  isKodokan: boolean;
  defaultValue: NoteData | null;
  onSubmit: (note: NoteData) => void;
  errors?: FormErrors;
  kataId: number | null | undefined;
}

interface LoginPopUpProps {
  isOpen: boolean;
  onClose: () => void; //typage : fonction qui ne prend pas d'argument et ne retourne rien
  belts: BeltData[];
}

interface MemberData {
  name?: string;
  email?: string;
  belt_id?: number;
  belt_name?: string;
  password?: string | null;
  hashed_password?: string | null;
}

interface NewMemberData {
  name: string;
  email: string;
  password: string;
  belt_id: number;
}

type NewTechniqueData = Omit<TechniqueData, "id">;

type NewKataData = Omit<KataData, "id">;

interface NoteData {
  id?: number;
  member_id?: number;
  technique_id?: number;
  content?: string;
  kata_id?: number | undefined | null;
}
interface NoteFormProps {
  defaultValue: NoteData | null;
  onSubmit: (note: NoteData) => void;
  errors?: FormErrors;
  techniqueId: number | undefined;
}
interface NoteDeleteFormProps {
  id: number;
  children: ReactNode;
}
interface PostKataResponse {
  insertId: number;
  errors?: FormErrors;
}
type PostMemberAndLoginResponse = {
  errors?: FormErrors;
  member: PostMemberResponse;
  login: PostLoginResponse;
};
interface PostLoginResponse {
  message: string;
  role: string;
  errors?: FormErrors;
}
interface PostMemberResponse {
  insertId: number;
  errors?: FormErrors;
}
interface PostTechniqueResponse {
  insertId: number;
  errors?: FormErrors;
}
interface PostTechniqueNoteResponse {
  insertId: number;
  errors?: FormErrors;
}

interface RadioButtonsProps {
  queryMode: string;
  handleQueryMode: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TechniqueData {
  id?: number;
  name: string;
  description: string;
  signification: string;
  category_name?: string;
  category_id?: number;
  belt_id?: number | null;
}

interface TechniqueDeleteFormProps {
  id: number;
  children: ReactNode;
}

interface TechniqueFormProps {
  belts: BeltData[];
  categories: CategoryData[];
  children: ReactNode;
  defaultValue: TechniqueData;
  onSubmit: (technique: TechniqueData) => void;
  errors?: FormErrors;
}

interface UserRoleProviderProps {
  children: ReactNode;
}

interface UserContextProps {
  role: string;
  setRole: (role: string) => void;
}

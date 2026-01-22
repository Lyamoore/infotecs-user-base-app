export interface UserModalProps {
  visible: boolean;
  onClose: () => void;
  user?: {
    id: string;
    name: string;
    avatar: string;
    date: string;
  };
  onSuccess?: () => void;
}

import AuthCard from "@/components/auth-card";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function LoginPage() {
  return (
    <DefaultLayout>
      <AuthCard />
    </DefaultLayout>
  );
}

import { PageTitle } from "@/components/App/Typography/PageTitle";
import { Button } from "@/components/Buttons/Button";

export default function SettingsPage() {
  return (
    <div>
      <PageTitle title="Settings" />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-form)] p-6">
          <h2 className="mb-4 text-lg font-medium text-[var(--color-text-main)]">
            Profile Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-main)]">
                Name
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-input)] px-3 py-2 text-sm text-[var(--color-text-main)]"
                defaultValue="Александр Христорождественский"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-main)]">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-input)] px-3 py-2 text-sm text-[var(--color-text-main)]"
                defaultValue="alex@example.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-main)]">
                Avatar
              </label>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="h-16 w-16 overflow-hidden rounded-full">
                    <img
                      src="/placeholder.svg?height=64&width=64"
                      alt="User Avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
              </div>
            </div>
            <div className="pt-2">
              <Button>Save Changes</Button>
            </div>
          </div>
        </div>
        <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-form)] p-6">
          <h2 className="mb-4 text-lg font-medium text-[var(--color-text-main)]">
            Security
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-main)]">
                Current Password
              </label>
              <input
                type="password"
                className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-input)] px-3 py-2 text-sm text-[var(--color-text-main)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-main)]">
                New Password
              </label>
              <input
                type="password"
                className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-input)] px-3 py-2 text-sm text-[var(--color-text-main)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-main)]">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-input)] px-3 py-2 text-sm text-[var(--color-text-main)]"
              />
            </div>
            <div className="pt-2">
              <Button>Update Password</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

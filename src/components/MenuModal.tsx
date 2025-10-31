import {
  AppWindow,
  BookText,
  Calendar,
  Folder,
  Home,
  Info,
  Link as LinkIcon,
  List,
  LogIn,
  Mail,
} from 'lucide-react';
import { useState } from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command';
import { Link } from 'react-router-dom';
import Login from './Login';

export const MenuModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <AppWindow className="text-[#EEF4ED] cursor-pointer bg-[#0B2545] m-1 p-1 rounded-md size-8" />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup heading="Navigation">
              <CommandItem>
                <Home className="mr-2 h-4 w-4" />
                <div>
                  <p className="font-medium">Home</p>
                  <p className="text-xs text-muted-foreground">
                    Welcome to my forever work-in-progress!
                  </p>
                </div>
              </CommandItem>

              <Link to={'/projetos'}>
                <CommandItem>
                  <Folder className="mr-2 h-4 w-4" />
                  <div>
                    <p className="font-medium">Projetos</p>
                    <p className="text-xs text-muted-foreground">Todos meus projetos</p>
                  </div>
                </CommandItem>
              </Link>

              <CommandItem>
                <BookText className="mr-2 h-4 w-4" />
                <div>
                  <p className="font-medium">Blog</p>
                  <p className="text-xs text-muted-foreground">
                    Thoughts, tutorials, and insights.
                  </p>
                </div>
              </CommandItem>

              <CommandItem>
                <Mail className="mr-2 h-4 w-4" />
                <div>
                  <p className="font-medium">Guestbook</p>
                  <p className="text-xs text-muted-foreground">Leave a message for me</p>
                </div>
              </CommandItem>

              <CommandItem>
                <LinkIcon className="mr-2 h-4 w-4" />
                <div>
                  <p className="font-medium">Links</p>
                  <p className="text-xs text-muted-foreground">All my links are here</p>
                </div>
              </CommandItem>

              <CommandItem>
                <Info className="mr-2 h-4 w-4" />
                <div>
                  <p className="font-medium">About</p>
                  <p className="text-xs text-muted-foreground">Learn more about me!</p>
                </div>
              </CommandItem>

              <CommandItem>
                <List className="mr-2 h-4 w-4" />
                <div>
                  <p className="font-medium">Bucket List</p>
                  <p className="text-xs text-muted-foreground">
                    Things I want to do at least once in my life
                  </p>
                </div>
              </CommandItem>

              <CommandItem>
                <Calendar className="mr-2 h-4 w-4" />
                <div>
                  <p className="font-medium">Book a Call</p>
                  <p className="text-xs text-muted-foreground">Schedule some time with me</p>
                </div>
              </CommandItem>

              <CommandItem>
                <Login />
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <div className="px-4 py-3 border-t">
              <div className="flex items-center justify-end gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-muted rounded-md">↑</kbd>
                  <kbd className="px-2 py-1 bg-muted rounded-md">↓</kbd>
                  <span>navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-muted rounded-md">↩</kbd>
                  <span>select</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-muted rounded-md">esc</kbd>
                  <span>close</span>
                </div>
              </div>
            </div>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};

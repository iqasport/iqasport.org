import { Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const MobileNavigation = dynamic(() => import('./mobile-navigation'));

export default function Sidebar({ isOpen, onClose, data }) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="xs">
      <DrawerOverlay />
      <DrawerContent bg="white" px={5} pt={3} overflowY="auto">
        <MobileNavigation
          onClose={onClose}
          data={data?.body}
          top_level_navigation={data?.top_level_navigation}
        />
      </DrawerContent>
    </Drawer>
  );
}

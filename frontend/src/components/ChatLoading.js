import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

const ChatLoading = () => {
  return (
    <Stack>
      <Skeleton height="45px" borderRadius="md" />
      <Skeleton height="45px" borderRadius="md" />
      <Skeleton height="45px" borderRadius="md" />
      <Skeleton height="45px" borderRadius="md" />
    </Stack>
  );
};

export default ChatLoading;

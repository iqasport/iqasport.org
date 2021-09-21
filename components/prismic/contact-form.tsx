import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import get from 'just-safe-get';
import axios from 'axios';

import {
  Heading,
  Button,
  Slice,
  Input,
  Box,
  Stack,
  Text,
  Textarea,
} from 'components';
import { CheckIcon } from '@chakra-ui/icons';
import { buttonVariants } from 'components/button';

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const schema = object({
  name: string().required('Please enter your name'),
  email: string()
    .email('Please enter a valid email address')
    .required('Please enter an email address'),
  subject: string().required('Please enter a subject'),
  message: string().required('Please enter your message'),
});

const handleContactSubmit = async (
  values,
  resetForm,
  setServerError,
  setServerSuccess
) => {
  try {
    setServerError(null);
    setServerSuccess(null);

    await axios.post('/api/contact', values);

    setServerSuccess(true);
    resetForm({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  } catch (err) {
    setServerError(err?.response?.data?.error?.message);
  }
};

const ContactForm = (rawData) => {
  const [serverError, setServerError] = useState(null);
  const [serverSuccess, setServerSuccess] = useState(null);

  useEffect(() => {
    if (serverSuccess) {
      const timer = setTimeout(() => {
        setServerSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }

    return () => {};
  }, [serverSuccess]);

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const variant = get(rawData, 'primary.variant');

  return (
    <Slice size="sm" variant={variant}>
      <Heading as="h1" fontFamily="body" textAlign="center">
        Contact Us
      </Heading>

      <form
        onSubmit={handleSubmit((values) =>
          handleContactSubmit(values, reset, setServerError, setServerSuccess)
        )}
      >
        <Stack spacing={4}>
          <Box>
            <Text as="label" fontSize="md" mb={2} htmlFor="name">
              Name
            </Text>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Your name..."
                  id="name"
                  bg="white"
                  border="1px solid"
                  borderColor={errors?.name ? 'red.400' : 'white'}
                  mt={2}
                  p={2}
                  color="gray.800"
                  fontSize="md"
                  width="100%"
                />
              )}
            />
            {errors?.name && (
              <Text
                fontSize="sm"
                color={variant === 'white' ? 'red.400' : 'red.900'}
                mb={0}
              >
                {errors?.name?.message}
              </Text>
            )}
          </Box>

          <Box>
            <Text as="label" fontSize="md" pb={4} htmlFor="email">
              Email
            </Text>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Your email address..."
                  id="email"
                  bg="white"
                  border="1px solid"
                  borderColor={errors?.email ? 'red.400' : 'white'}
                  mt={2}
                  p={2}
                  color="gray.800"
                  fontSize="md"
                  width="100%"
                />
              )}
            />
            {errors?.email && (
              <Text
                fontSize="sm"
                color={variant === 'white' ? 'red.400' : 'red.900'}
                mb={0}
              >
                {errors?.email?.message}
              </Text>
            )}
          </Box>

          <Box>
            <Text as="label" fontSize="md" pb={4} htmlFor="subject">
              Subject
            </Text>
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="What the message is about..."
                  id="subject"
                  bg="white"
                  border="1px solid"
                  borderColor={errors?.subject ? 'red.400' : 'white'}
                  mt={2}
                  p={2}
                  color="gray.800"
                  fontSize="md"
                  width="100%"
                />
              )}
            />
            {errors?.subject && (
              <Text
                fontSize="sm"
                color={variant === 'white' ? 'red.400' : 'red.900'}
                mb={0}
              >
                {errors?.subject?.message}
              </Text>
            )}
          </Box>

          <Box>
            <Text as="label" fontSize="md" mb={2} htmlFor="message">
              Your message
            </Text>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Your message..."
                  id="message"
                  bg="white"
                  p={2}
                  color="gray.800"
                  border="1px solid"
                  mt={2}
                  borderColor={errors?.message ? 'red.400' : 'white'}
                  fontSize="md"
                  width="100%"
                />
              )}
            />
            {errors?.message && (
              <Text
                fontSize="sm"
                color={variant === 'white' ? 'red.400' : 'red.900'}
                mb={0}
              >
                {errors?.message?.message}
              </Text>
            )}
          </Box>

          <Button
            variant={buttonVariants[variant]}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              'Submitting'
            ) : serverSuccess ? (
              <>
                <CheckIcon mr={3} />
                Message sent
              </>
            ) : (
              'Contact us'
            )}
          </Button>
        </Stack>
      </form>

      {serverError && (
        <Text color={variant === 'white' ? 'red.400' : 'red.900'} my={3}>
          {serverError}
        </Text>
      )}
    </Slice>
  );
};

export default ContactForm;

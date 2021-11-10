import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, boolean } from 'yup';
import get from 'just-safe-get';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Heading,
  Input,
  Box,
  Stack,
  Textarea,
  Select,
  Checkbox,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { buttonVariants } from 'components/button';
import { getDocs } from 'modules/prismic';

const Slice = dynamic(() => import('components/slice'));
const Text = dynamic(() => import('components/text'));
const Button = dynamic(() => import('components/button'));

type FormValues = {
  name: string;
  email: string;
  role: Record<string, unknown>;
  message: string;
  tandc: boolean;
};

const schema = object({
  name: string().required('Please enter your name'),
  email: string()
    .email('Please enter a valid email address')
    .required('Please enter an email address'),
  message: string().required('Please enter your personal statement'),
  tandc: boolean()
    .oneOf([true], 'You must agree to the Privacy Policy')
    .required(),
});

const handleVolunteerSubmit = async (
  values,
  roles,
  resetForm,
  setServerError,
  setServerSuccess
) => {
  try {
    setServerError(null);
    setServerSuccess(null);

    const { role, ...formValues } = values;

    const data = {
      ...formValues,
      role: roles.find((r) => r.uid === role)?.data,
    };

    await axios.post('/api/volunteer', data);

    setServerSuccess(true);
    resetForm({
      name: '',
      email: '',
      role: null,
      message: '',
      tandc: false,
    });
  } catch (err) {
    setServerError(err?.response?.data?.error?.message);
  }
};

const VolunteerForm = (rawData) => {
  const [serverError, setServerError] = useState(null);
  const [serverSuccess, setServerSuccess] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const getRoles = async () => {
      if (roles.length === 0) {
        const allRoles = await getDocs('roles', { pageSize: 100 });
        setRoles(allRoles);
      }
    };

    getRoles();
  }, [setRoles, roles]);

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
      role: null,
      message: '',
      tandc: false,
    },
  });

  const variant = get(rawData, 'primary.variant');

  return (
    <Slice size="sm" variant={variant}>
      <Heading as="h1" fontFamily="body" textAlign="center" id="volunteer-form">
        Apply to Volunteer
      </Heading>

      <form
        onSubmit={handleSubmit((values) =>
          handleVolunteerSubmit(
            values,
            roles,
            reset,
            setServerError,
            setServerSuccess
          )
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
            <Text as="label" fontSize="md" pb={4} htmlFor="role">
              Role
            </Text>
            <Controller
              name="role"
              control={control}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, ...fields } }) => (
                <Select
                  {...fields}
                  placeholder="Select the role..."
                  id="role"
                  bg="white"
                  border="1px solid"
                  borderColor={errors?.role ? 'red.400' : 'white'}
                  mt={2}
                  color="gray.800"
                  fontSize="md"
                  width="100%"
                >
                  {roles.map((role) => (
                    <option key={role?.uid} value={role?.uid}>
                      {role?.data?.title}
                    </option>
                  ))}
                </Select>
              )}
            />
            {errors?.role && (
              <Text
                fontSize="sm"
                color={variant === 'white' ? 'red.400' : 'red.900'}
                mb={0}
              >
                {errors?.role?.message}
              </Text>
            )}
          </Box>

          <Box>
            <Text as="label" fontSize="md" mb={2} htmlFor="message">
              Personal Statement
            </Text>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Tell us about yourself and why you are interested in the role"
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

          <Box>
            <Controller
              name="tandc"
              control={control}
              render={({ field: { value, ...fields } }) => (
                <Checkbox
                  {...fields}
                  id="checkbox"
                  type="checkbox"
                  spacing={4}
                  borderColor={variant === 'primary' ? 'inherit' : 'gray.800'}
                >
                  I understand and agree to the storing and processing of the
                  above data in line with the{' '}
                  <Link href="https://iqasport.org/privacy-policy" passHref>
                    <ChakraLink fontWeight="bold" target="_blank">
                      Privacy Policy
                    </ChakraLink>
                  </Link>
                </Checkbox>
              )}
            />
            {errors?.tandc && (
              <Text
                fontSize="sm"
                color={variant === 'white' ? 'red.400' : 'red.900'}
                mb={0}
              >
                {errors?.tandc?.message}
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
              'Volunteer with us'
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

export default VolunteerForm;

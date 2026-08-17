type FieldErrorProps = {
  errors?: string[];
  id?: string;
};

export function FieldError({ errors, id }: FieldErrorProps) {
  if (!errors?.length) return null;

  return (
    <p id={id} role="alert" className="mt-1 text-sm text-red-700">
      {errors[0]}
    </p>
  );
}

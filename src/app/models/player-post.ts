export interface PlayerPost {
  // @NotBlank(message = "Players first name is mandatory")
  // @Size(max = 70, message = "Firstname must not exceed 70 characters")
  firstName: string;

  // @NotBlank(message = "Players last name is mandatory")
  // @Size(max = 70, message = "Lastname must not exceed 70 characters")
  lastName: string;

  // @NotNull
  // @Min(value = 0)
  // @Max(value = 99999999)
  passnumber: number;
}

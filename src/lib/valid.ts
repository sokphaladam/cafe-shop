class validInput {
  public NullEmptyString(value: string) {
    return !value || !value.replace(" ", "");
  }
}

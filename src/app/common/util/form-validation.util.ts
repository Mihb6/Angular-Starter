import { AbstractControl, ValidationErrors } from "@angular/forms";

export function validateAssetName(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return null;
  }

  return value.includes('/') ? {assetNameError: {valid: false}} : null;
}

export function fileSizeValidator(control: AbstractControl, maxSizeInBytes: number): ValidationErrors | null {
  const file = control.value;
  if (!file || !file[0]) {
    return null;
  } else {
    return file[0].size > maxSizeInBytes ? {fileSize: maxSizeInBytes} : null;
  }
}

export function validateTypeAssetName(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const pattern = /^[^%?;#\/\\]*$/;

  if (!value) {
    return null;
  }

  return pattern.test(value) ? null :  {assetTypeNameError: {valid: false}};
}

export type Device = {
  id: number,
  createdAt: number,
  updatedAt: number,
  title: string,
  brand: Brand,
  category: string,
  price: number,
  availableColors: string[],
  releaseDate: string,
  storageOptions: string[],
  battery_mAh: number,
  display_inches: number,
  cpu: string,
  features: string[],
  photo: string,
}

export type Brand = {
  name: string,
  logo: string
}

export type Filters = {
  title: string | undefined
  category: string | undefined
}

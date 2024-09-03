/*
  Warnings:

  - Changed the type of `img_url` on the `Category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `img_url` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "img_url",
ADD COLUMN     "img_url" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "img_url",
ADD COLUMN     "img_url" JSONB NOT NULL;

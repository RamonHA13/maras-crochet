-- CreateTable
CREATE TABLE "UserFavoriteProducts" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserFavoriteProducts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserFavoriteProducts_productId_userId_key" ON "UserFavoriteProducts"("productId", "userId");

-- AddForeignKey
ALTER TABLE "UserFavoriteProducts" ADD CONSTRAINT "UserFavoriteProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteProducts" ADD CONSTRAINT "UserFavoriteProducts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

import { notFound } from 'next/navigation';
import { db } from '@/app/db';
import ProductEditForm from '@/components/ProductEditForm';
import { Product } from '@prisma/client';
import React from 'react';

interface ProductEditPageProps {
  params: {
    productId: string;
  };
}

export default async function ProductEditPage({ params }: ProductEditPageProps) {
  const productId = Number(params.productId);

  if (isNaN(productId)) {
    return notFound();
  }

  const product: Product | null = await db.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return notFound();
  }

  const plainProduct = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price.toString(), // Assuming this is a Decimal or BigInt
    quantity: product.quantity,
    imageUrl: product.imageUrl,
    status: product.status,
  };

  return <ProductEditForm product={plainProduct} />;
}

import mongoose from 'mongoose';

if (mongoose.models.Product) {
  delete mongoose.models.Product;
}

const VariantSchema = new mongoose.Schema({
  weight: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  stock: { type: Number, default: 0 },
});

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
    variants: [VariantSchema], 
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Product', ProductSchema);

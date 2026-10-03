"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaMinus, FaPlus, FaWhatsapp, FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useCart } from "../../context/CartContext";
import { formatWhatsAppMessage } from "../../utils/formatWhatsAppMessage";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

interface DeliveryFormData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  landmark: string;
  latitude?: number;
  longitude?: number;
}

export default function CartPage() {
  const t = useTranslations("cart");
  const tProducts = useTranslations("products");
  const locale = useLocale();
  const { items, removeFromCart, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState<DeliveryFormData>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    landmark: "",
    latitude: undefined,
    longitude: undefined,
  });

  const [errors, setErrors] = useState<Partial<DeliveryFormData>>({});
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof DeliveryFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleUseCurrentLocation = async () => {
    setLoadingLocation(true);
    
    if (!navigator.geolocation) {
      alert(t('geoNotSupported'));
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Try to get address from coordinates using Nominatim (OpenStreetMap)
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );
          const data = await response.json();
          
          if (data.address) {
            setFormData(prev => ({
              ...prev,
              address: data.display_name || '',
              city: `${data.address.city || data.address.town || data.address.village || ''}, ${data.address.state || ''}`,
              pincode: data.address.postcode || '',
              latitude,
              longitude,
            }));
          }
        } catch (error) {
          console.error('Error fetching address:', error);
          setFormData(prev => ({
            ...prev,
            latitude,
            longitude,
          }));
        }
        
        setLoadingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert(t('geoError'));
        setLoadingLocation(false);
      }
    );
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<DeliveryFormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t("fullNameRequired");
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t("phoneRequired");
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = t("phoneInvalid");
    }
    if (!formData.address.trim()) {
      newErrors.address = t("addressRequired");
    }
    if (!formData.city.trim()) {
      newErrors.city = t("cityRequired");
    }
    if (!formData.pincode.trim()) {
      newErrors.pincode = t("pincodeRequired");
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = t("pincodeInvalid");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    if (!validateForm()) {
      return;
    }

    const whatsappUrl = formatWhatsAppMessage(items, formData, locale);
    window.open(whatsappUrl, "_blank");
    
    // Clear cart after redirect
    setTimeout(() => {
      clearCart();
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-[var(--burgundy-50)] to-white pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="text-8xl mb-6">🛒</div>
              <h1 className="text-4xl font-bold text-[var(--maroon)] mb-4 font-serif">
                {t("empty")}
              </h1>
              <p className="text-xl text-gray-600 mb-8">{t("emptyDesc")}</p>
              <Link
                href={`/${locale}#products`}
                className="inline-flex items-center gap-2 bg-[var(--maroon)] text-white px-8 py-4 rounded-full font-semibold hover:bg-[var(--burgundy-800)] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FaArrowLeft />
                {t("continueShopping")}
              </Link>
            </motion.div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[var(--burgundy-50)] to-white pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Link
            href={`/${locale}#products`}
            className="inline-flex items-center gap-2 text-[var(--maroon)] hover:text-[var(--burgundy-800)] mb-6 transition-colors"
          >
            <FaArrowLeft />
            {t("continueShopping")}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--maroon)] font-serif">
            {t("title")}
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-[var(--gold)]/20"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="relative w-full sm:w-32 h-32 flex-shrink-0 bg-gradient-to-br from-[var(--burgundy-50)] to-[var(--gold-50)] rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                      sizes="128px"
                      unoptimized
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[var(--maroon)] mb-2">
                        {item.name}
                      </h3>
                      <p className="text-lg font-semibold text-[var(--gold-700)]">
                        ₹{item.price} <span className="text-sm text-gray-500">/ {tProducts("pack")}</span>
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-[var(--maroon)] hover:bg-[var(--burgundy-50)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <FaMinus className="w-3 h-3" />
                        </motion.button>
                        <span className="text-lg font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= 10}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-[var(--maroon)] hover:bg-[var(--burgundy-50)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <FaPlus className="w-3 h-3" />
                        </motion.button>
                      </div>

                      {/* Remove Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item.id)}
                        className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <FaTrash className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary & Delivery Form */}
          <div className="space-y-6">
            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-[var(--gold)]/20 sticky top-24"
            >
              <h2 className="text-2xl font-bold text-[var(--maroon)] mb-6 font-serif">
                {t("orderSummary")}
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>{t("items", { count: getTotalItems() })}</span>
                  <span className="font-semibold">{getTotalItems()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>{t("subtotal")}</span>
                  <span className="font-semibold">₹{getTotalPrice()}</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-[var(--maroon)]">
                    <span>{t("total")}</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Form */}
              <div className="border-t-2 border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-[var(--maroon)] mb-4">
                  {t("deliveryTitle")}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{t("deliveryDesc")}</p>

                {/* Use Current Location Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUseCurrentLocation}
                  disabled={loadingLocation}
                  className="w-full mb-4 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingLocation ? (
                    <>
                      <span className="animate-spin">📍</span>
                      <span>{t('gettingLocation')}</span>
                    </>
                  ) : (
                    <>
                      <span>📍</span>
                      <span>{t('useCurrentLocation')}</span>
                    </>
                  )}
                </motion.button>

                {/* Map Preview */}
                {formData.latitude && formData.longitude && (
                  <div className="mb-4 rounded-lg overflow-hidden border-2 border-[var(--gold)]/30">
                    <iframe
                      width="100%"
                      height="200"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${formData.longitude - 0.01},${formData.latitude - 0.01},${formData.longitude + 0.01},${formData.latitude + 0.01}&layer=mapnik&marker=${formData.latitude},${formData.longitude}`}
                      title="Location Map"
                    />
                    <div className="bg-gray-50 p-2 text-center text-xs text-gray-600">
                      {t('yourDeliveryLocation')}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("fullName")} *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder={t("fullNamePlaceholder")}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--maroon)] focus:border-transparent transition-all ${
                        errors.fullName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("phone")} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t("phonePlaceholder")}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--maroon)] focus:border-transparent transition-all ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("address")} *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder={t("addressPlaceholder")}
                      rows={3}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--maroon)] focus:border-transparent transition-all resize-none ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("city")} *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder={t("cityPlaceholder")}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--maroon)] focus:border-transparent transition-all ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("pincode")} *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder={t("pincodePlaceholder")}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--maroon)] focus:border-transparent transition-all ${
                        errors.pincode ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
                    )}
                  </div>

                  {/* Landmark */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("landmark")}
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      placeholder={t("landmarkPlaceholder")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--maroon)] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full mt-6 flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-lg font-bold hover:bg-[#20BA5A] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FaWhatsapp className="w-6 h-6" />
                {t("checkout")}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}

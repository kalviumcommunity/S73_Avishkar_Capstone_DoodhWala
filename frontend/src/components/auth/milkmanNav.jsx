"use client";

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Bell,
  Home,
  Package,
  Wallet,
  ChevronDown,
  Droplets,
  Menu,
  X,
  Truck,
  Settings,
  Users,
  Milk,
  LogOut,
  User,
} from "lucide-react";

export default function MilkmanNavbar() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showDeliveryDropdown, setShowDeliveryDropdown] = useState(false);
  const [deliveryRange, setDeliveryRange] = useState(5);
  const [isMobile, setIsMobile] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [earnings, setEarnings] = useState({
    today: "₹1,250",
    week: "₹8,750",
    month: "₹32,500",
  });
  const [pathname, setPathname] = useState(window.location.pathname);

  const notificationDropdownRef = useRef(null);
  const deliveryDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  // Sample notifications
  const sampleNotifications = [
    {
      id: 1,
      title: "New Order",
      message: "John Doe placed a new order #1234",
      time: "2 mins ago",
      read: false,
    },
    {
      id: 2,
      title: "Payment Received",
      message: "You received ₹250 for order #1230",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "New Review",
      message: "Sarah gave you a 5-star rating",
      time: "5 hours ago",
      read: true,
    },
  ];

  // Fetch milkman profile and delivery range
  const fetchMilkmanProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      // This is a placeholder for the actual API endpoint
      // You'll need to create this endpoint in your backend
      const response = await axios.get(
        "http://localhost:8000/api/milkman/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If the API returns delivery range, update the state
      if (response.data.deliveryRange) {
        setDeliveryRange(response.data.deliveryRange);
      }
    } catch (error) {
      console.error("Error fetching milkman profile:", error);
      // Silently fail, don't show error to user in navbar
    }
  };

  // Save delivery range to backend
  const saveDeliveryRange = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      // This is a placeholder for the actual API endpoint
      // You'll need to create this endpoint in your backend
      await axios.put(
        "http://localhost:8000/api/milkman/delivery-range",
        { deliveryRange },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Close dropdown after saving
      setShowDeliveryDropdown(false);
    } catch (error) {
      console.error("Error saving delivery range:", error);
      // You could show an error toast here
    }
  };

  useEffect(() => {
    // Set initial mobile state
    setIsMobile(window.innerWidth < 768);

    // Add resize listener
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    // Load notifications
    setNotifications(sampleNotifications);

    // Fetch milkman profile
    fetchMilkmanProfile();

    // Update pathname when location changes
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    // Listen for location changes
    window.addEventListener("popstate", handleLocationChange);

    // Handle clicks outside dropdowns
    function handleClickOutside(event) {
      const deliveryToggleButton = document.querySelector(
        "[data-delivery-toggle]"
      );
      const profileToggleButton = document.querySelector(
        "[data-profile-toggle]"
      );
      const notificationToggleButton = document.querySelector(
        "[data-notification-toggle]"
      );

      const isOutsideDelivery =
        deliveryDropdownRef.current &&
        !deliveryDropdownRef.current.contains(event.target) &&
        deliveryToggleButton !== event.target &&
        !deliveryToggleButton?.contains(event.target);

      const isOutsideProfile =
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        profileToggleButton !== event.target &&
        !profileToggleButton?.contains(event.target);

      const isOutsideNotification =
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target) &&
        notificationToggleButton !== event.target &&
        !notificationToggleButton?.contains(event.target);

      if (isOutsideDelivery) setShowDeliveryDropdown(false);
      if (isOutsideProfile) setShowProfileDropdown(false);
      if (isOutsideNotification) setShowNotifications(false);
    }

    // Listen for clicks outside dropdowns
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("popstate", handleLocationChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleRangeChange = (e) => {
    setDeliveryRange(e.target.value);
  };

  const navLinks = [
    {
      href: "/",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      href: "/orders",
      label: "Orders",
      icon: <Package className="h-5 w-5" />,
    },
    {
      href: "/products",
      label: "Products",
      icon: <Milk className="h-5 w-5" />,
    },
    {
      href: "/customers",
      label: "Customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      href: "/earnings",
      label: "Earnings",
      icon: <Wallet className="h-5 w-5" />,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-lg hidden md:block">
        <div className="max-w-7xl mx-auto">
          {/* Top bar with logo and stats */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <Droplets className="h-8 w-8 text-red-600" />
              <div className="ml-2">
                <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                  MilkMan
                </span>
                <span className="text-xs text-gray-500 ml-2 bg-yellow-100 px-2 py-0.5 rounded-full">
                  Seller
                </span>
              </div>
            </Link>

            {/* Quick Stats */}
            <div className="flex space-x-6">
              <div className="text-center">
                <p className="text-xs text-gray-500">Today's Earnings</p>
                <p className="font-semibold text-gray-800">{earnings.today}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">This Week</p>
                <p className="font-semibold text-gray-800">{earnings.week}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">This Month</p>
                <p className="font-semibold text-gray-800">{earnings.month}</p>
              </div>
            </div>

            {/* Delivery Range Selector */}
            <div className="relative">
              <div
                data-delivery-toggle
                className="flex items-center justify-between bg-gray-50 rounded-full py-2 px-4 cursor-pointer border border-gray-200 hover:border-red-300 transition-colors"
                onClick={() => setShowDeliveryDropdown(!showDeliveryDropdown)}
              >
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-red-600 mr-2" />
                  <span className="text-gray-800">
                    Delivery Range: {deliveryRange} km
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform ml-2 ${
                    showDeliveryDropdown ? "rotate-180" : ""
                  }`}
                />
              </div>

              {showDeliveryDropdown && (
                <div
                  ref={deliveryDropdownRef}
                  className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-20 w-80 p-4"
                >
                  <h3 className="font-medium text-gray-800 mb-3">
                    Set Delivery Range
                  </h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">1 km</span>
                    <span className="text-gray-600">10 km</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={deliveryRange}
                    onChange={handleRangeChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="mt-4 flex justify-between">
                    <p className="text-sm text-gray-600">
                      Current range:{" "}
                      <span className="font-medium">{deliveryRange} km</span>
                    </p>
                    <button
                      onClick={saveDeliveryRange}
                      className="text-sm bg-red-600 text-white px-3 py-1 rounded-full"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  data-notification-toggle
                  className="p-2 rounded-full hover:bg-gray-100 relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-6 w-6 text-gray-600" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div
                    ref={notificationDropdownRef}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-20"
                  >
                    <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-semibold">Notifications</h3>
                      <button className="text-sm text-red-600">
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${
                            !notification.read ? "bg-red-50" : ""
                          }`}
                        >
                          <div className="flex justify-between">
                            <h4 className="font-medium text-gray-800">
                              {notification.title}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center">
                      <Link
                        to="/notifications"
                        className="text-sm text-red-600 font-medium"
                      >
                        View all notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Settings */}
              <Link to="/settings">
                <Settings className="h-6 w-6 text-gray-600" />
              </Link>

              {/* User Profile */}
              <div className="relative" ref={profileDropdownRef}>
                <div
                  data-profile-toggle
                  className="h-10 w-10 rounded-full bg-gradient-to-r from-red-500 to-yellow-500 flex items-center justify-center text-white font-bold cursor-pointer"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  MS
                </div>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <Link
                      to="/service-area"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Service Area
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom bar with navigation */}
          <div className="flex items-center h-12 px-4">
            <div className="flex space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors py-3 border-b-2 ${
                      isActive
                        ? "text-red-600 border-red-600"
                        : "text-gray-600 border-transparent hover:text-red-600 hover:border-red-300"
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-md md:hidden">
        <div className="flex items-center justify-between h-16 px-4">
          <button
            className="p-2 rounded-md focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>

          <Link to="/" className="flex items-center">
            <Droplets className="h-7 w-7 text-red-600" />
            <div className="ml-1">
              <span className="text-lg font-bold bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                MilkMan
              </span>
              <span className="text-xs text-gray-500 ml-1 bg-yellow-100 px-1 py-0.5 rounded-full">
                Seller
              </span>
            </div>
          </Link>

          <div className="flex items-center">
            <button
              className="p-2 rounded-full relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-6 w-6 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Quick Stats */}
        <div className="flex justify-between px-4 py-2 bg-gray-50 border-t border-b border-gray-200">
          <div className="text-center flex-1">
            <p className="text-xs text-gray-500">Today</p>
            <p className="font-semibold text-gray-800">{earnings.today}</p>
          </div>
          <div className="text-center flex-1 border-l border-r border-gray-200">
            <p className="text-xs text-gray-500">Week</p>
            <p className="font-semibold text-gray-800">{earnings.week}</p>
          </div>
          <div className="text-center flex-1">
            <p className="text-xs text-gray-500">Month</p>
            <p className="font-semibold text-gray-800">{earnings.month}</p>
          </div>
        </div>

        {/* Mobile Notifications Dropdown */}
        {showNotifications && (
          <div className="px-4 py-2">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 z-20">
              <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-semibold">Notifications</h3>
                <button className="text-sm text-red-600">
                  Mark all as read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${
                      !notification.read ? "bg-red-50" : ""
                    }`}
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gray-800">
                        {notification.title}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center">
                <Link
                  to="/notifications"
                  className="text-sm text-red-600 font-medium"
                >
                  View all notifications
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isOpen && (
          <div className="bg-white border-t border-gray-100 shadow-lg">
            <div className="py-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center gap-3 px-4 py-3 text-base ${
                      isActive
                        ? "text-red-600 bg-red-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              {/* Delivery Range in Mobile Menu */}
              <div className="px-4 py-3 border-t border-gray-100">
                <h3 className="text-base font-medium text-gray-800 mb-3">
                  Delivery Range
                </h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">1 km</span>
                  <span className="text-sm text-gray-600">10 km</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={deliveryRange}
                  onChange={handleRangeChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <p className="mt-2 text-sm text-gray-600">
                  Current range:{" "}
                  <span className="font-medium">{deliveryRange} km</span>
                </p>
                <button
                  onClick={saveDeliveryRange}
                  className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg text-sm"
                >
                  Save Delivery Range
                </button>
              </div>

              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-3 text-base text-gray-600 hover:bg-gray-50 border-t border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>

              <Link
                to="/settings"
                className="flex items-center gap-3 px-4 py-3 text-base text-gray-600 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-base text-red-600 hover:bg-red-50 w-full text-left"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
        <div className="flex justify-around items-center h-16">
          {navLinks.slice(0, 5).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`flex flex-col items-center justify-center w-full h-full ${
                  isActive ? "text-red-600" : "text-gray-500 hover:text-red-600"
                }`}
              >
                {link.icon}
                <span className="text-xs mt-1">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Page content padding */}
      <div className="pt-16 md:pt-28 pb-16 md:pb-0"></div>
    </>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Bell,
  Home,
  MapPin,
  Package,
  User,
  Wallet,
  ChevronDown,
  Search,
  Calendar,
  Droplets,
  Menu,
  X,
} from "lucide-react";

export default function CustomerNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select location");
  const locationDropdownRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationDropdownRef = useRef(null);
  const [pathname, setPathname] = useState(location.pathname);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileDropdownRef = useRef(null);

  // Sample saved addresses
  const savedAddresses = [
    { id: 1, name: "Home", address: "123 Milk Street, Dairy Town" },
    { id: 2, name: "Work", address: "456 Cream Avenue, Yogurt City" },
    { id: 3, name: "Gym", address: "789 Butter Lane, Cheese County" },
    { id: 4, name: "Gym", address: "789 Butter Lane, Cheese County" },
    { id: 5, name: "Gym", address: "789 Butter Lane, Cheese County" },
  ];

  // Sample notifications
  const sampleNotifications = [
    {
      id: 1,
      title: "Order Confirmed",
      message: "Your order #1234 has been confirmed",
      time: "2 mins ago",
      read: false,
    },
    {
      id: 2,
      title: "Delivery Update",
      message: "Your milk will be delivered in 15 minutes",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Payment Reminder",
      message: "Your subscription payment is due tomorrow",
      time: "5 hours ago",
      read: true,
    },
    {
      id: 4,
      title: "Payment Reminder",
      message: "Your subscription payment is due tomorrow",
      time: "5 hours ago",
      read: true,
    },
    {
      id: 5,
      title: "Payment Reminder",
      message: "Your subscription payment is due tomorrow",
      time: "5 hours ago",
      read: true,
    },
    {
      id: 6,
      title: "Order Confirmed",
      message: "Your order #1234 has been confirmed",
      time: "2 mins ago",
      read: false,
    },
  ];

  useEffect(() => {
    // Set initial mobile state
    setIsMobile(window.innerWidth < 768);

    // Add resize listener
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    // Load notifications
    setNotifications(sampleNotifications);

    // Update pathname when location changes
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    // Listen for location changes
    window.addEventListener("popstate", handleLocationChange);

    // clicking outside profile dropdown closes it
    function handleClickOutside(event) {
      // Check if the click happened inside any dropdown, if not, close them
      const locationToggleButton = document.querySelector(
        "[data-location-toggle"
      );
      const profileToggleButton = document.querySelector(
        "[data-profile-toggle"
      );
      const notificationToggleButton = document.querySelector(
        "[data-notification-toggle"
      );

      // Check if the click happened inside any dropdown or on a toggle button
      const isOutsideProfile =
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        profileToggleButton !== event.target &&
        !profileToggleButton?.contains(event.target);

      const isOutsideLocation =
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target) &&
        locationToggleButton !== event.target &&
        !locationToggleButton?.contains(event.target);

      const isOutsideNotification =
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target) &&
        notificationToggleButton !== event.target &&
        !notificationToggleButton?.contains(event.target);

      if (isOutsideProfile) setShowProfileDropdown(false);
      if (isOutsideLocation) setShowLocationDropdown(false);
      if (isOutsideNotification) setShowNotifications(false);
    }

    //Listen for Clicks Outside P icon
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("popstate", handleLocationChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectAddress = (address) => {
    setSelectedLocation(address.name);
    setShowLocationDropdown(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    {
      href: "/",
      label: "Home",
      icon: <Home className="h-5 w-5" />,
    },
    {
      href: "/orders",
      label: "Orders",
      icon: <Package className="h-5 w-5" />,
    },
    {
      href: "/subscriptions",
      label: "Subscriptions",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      href: "/wallet",
      label: "Wallet",
      icon: <Wallet className="h-5 w-5" />,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: <User className="h-5 w-5" />,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-lg hidden md:block">
        <div className="max-w-7xl mx-auto">
          {/* Top bar with logo and location */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <Droplets className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                MilkMan
              </span>
            </Link>

            {/* Location Selector */}
            <div className="relative">
              <div
                data-location-toggle
                className="flex items-center justify-between rounded-lg py-2 px-4 cursor-pointer border border-gray-200 hover:border-red-300 transition-colors"
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              >
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-red-600 mr-2" />
                  <span className="text-gray-800 truncate max-w-[150px]">
                    {selectedLocation}
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform ml-2 ${
                    showLocationDropdown ? "rotate-180" : ""
                  }`}
                />
              </div>

              {showLocationDropdown && (
                <div
                  ref={locationDropdownRef}
                  className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-20 w-80"
                >
                  <div className="mt-2 mb-1 text-gray-500 text-[12px] text-center">
                    SAVED ADDRESSES
                  </div>

                  <div className="px-1 max-h-49 overflow-y-auto">
                    {savedAddresses.map((address) => (
                      <div
                        key={address.id}
                        className="p-1.5 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                        onClick={() => selectAddress(address)}
                      >
                        <div className="font-medium text-gray-800">
                          {address.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {address.address}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-2 text-orange-600 font-medium hover:bg-gray-50 cursor-pointer rounded-md">
                    <Link
                      to="/address"
                      className="flex items-center justify-center gap-2"
                    >
                      <MapPin className="h-5 w-5" />
                      <span className="whitespace-nowrap">Add new address</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="relative w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search for milkmen, products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
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

              {/* User Profile */}
              <div className="relative" ref={profileDropdownRef}>
                <div
                  data-profile-toggle
                  className="h-10 w-10 rounded-full bg-gradient-to-r from-red-500 to-yellow-500 flex items-center justify-center text-white font-bold"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  JD
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
                    <button
                      onClick={() => console.log("Signing out...")}
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
                        : "text-gray-600 border-transparent hover:text-red-600 "
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
            <span className="ml-1 text-lg font-bold bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
              MilkMan
            </span>
          </Link>

          <div className="flex items-center">
            <button className="p-2 rounded-full relative">
              <Bell className="h-6 w-6 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Location Bar */}
        <div className="px-4 pb-3">
          <div
            className="flex items-center justify-between bg-gray-50 rounded-full py-2 px-4 cursor-pointer border border-gray-200"
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
          >
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-gray-800 truncate">{selectedLocation}</span>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-gray-500 transition-transform ${
                showLocationDropdown ? "rotate-180" : ""
              }`}
            />
          </div>

          {showLocationDropdown && (
            <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
              <div className="p-3 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search for an address..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {savedAddresses.map((address) => (
                  <div
                    key={address.id}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                    onClick={() => selectAddress(address)}
                  >
                    <div className="font-medium text-gray-800">
                      {address.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {address.address}
                    </div>
                  </div>
                ))}
                <div className="p-3 text-red-600 font-medium hover:bg-gray-50 cursor-pointer flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Add new address
                </div>
              </div>
            </div>
          )}
        </div>

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
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
        <div className="flex justify-around items-center h-16">
          {navLinks.map((link) => {
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

import Head from "next/head";
import Script from "next/script";

import { CallToAction } from "@/components/CallToAction";
import { Faqs } from "@/components/Faqs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

import { Pricing } from "@/components/Pricing";
import { MainFeatures } from "@/components/MainFeatures";
import { Testimonials } from "@/components/Testimonials";
import { NavLink } from "@/components/NavLink";

import { Alert } from "@/components/Alert";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { userService } from "@/services/user.service";
import { postService } from "@/services/post.service";
import { alertService } from "@/services/alert.service";

import Image from "next/image";
import examplePic from "@/images/screenshots/family1.png";
import examplePic2 from "@/images/screenshots/family2.png";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    if (!userService.userValue) {
      setAuthorized(false);
    } else {
      setAuthorized(true);
      console.log("Authorized!");
      getAllPosts();
    }
  }

  function openModal() {
    console.log("Open");
    document.getElementById("createPostDialog").showModal();
  }

  function closeModal() {
    console.log("Close");
    document.getElementById("createPostDialog").close();
  }

  function getAllPosts() {
    postService.getAllPosts().then((response) => {
      response.reverse();
      setDashboardData(response);
      console.log("Dashboard data:");
      console.log(dashboardData);
    });
  }

  function createPost() {
    console.log("Creating Post");
    let post = {
      text: document.getElementById("postText").value,
      user_id: userService.userValue.id,
      user_name:
        userService.userValue.first_name +
        " " +
        userService.userValue.last_name,
      family_id: null,
    };

    return postService
      .createPost(post)
      .then(() => {
        getAllPosts();
        closeModal();
      })
      .catch(alertService.error);
  }

  return (
    <>
      <Head>
        <title>FamilyHub</title>
        <meta name="description" content="" />
      </Head>
      <div className={`app-container ${user ? "bg-light" : ""}`}>
        <Alert />
        <Header />
        <main>
          {/* Content below here to show when logged in */}
          {authorized && [
            <div class="mx-3 my-2 flex">
              {/* Left column */}
              <div class="dashboard-column mx-2 w-3/12 p-4">
                <h2>
                  Hello, {userService.userValue.first_name}{" "}
                  {userService.userValue.last_name}
                </h2>
                <hr class="my-5"></hr>
                <p>6:20 PM</p>
                <p>Monday, 16th of September 2022</p>
                <hr class="my-5"></hr>
                <p>
                  <NavLink href="">Posts</NavLink>
                </p>
                <p>
                  <NavLink href="">Events</NavLink>
                </p>
                <p>
                  <NavLink href="">Emergency Info</NavLink>
                </p>
              </div>
              {/* Middle column */}
              <div class="dashboard-column no-scrollbar mx-2 w-6/12 overflow-auto px-4">
                {/* Create Post section */}
                <div>
                  <button
                    class="button my-4 py-2"
                    id="createPostBtn"
                    onClick={openModal}
                  >
                    Create post
                  </button>
                  <dialog id="createPostDialog" class="w-3/5 rounded-xl">
                    <div class="mb-4 flex justify-between">
                      <h2>Create post</h2>
                      <button onClick={closeModal}>Close</button>
                    </div>
                    <textarea
                      id="postText"
                      name="postText"
                      placeholder="What's on your mind?"
                      class="w-full rounded-xl"
                    ></textarea>
                    <button onClick={createPost} class="button mt-4 py-2">
                      Post
                    </button>
                  </dialog>
                </div>
                {/* Loop */}
                {dashboardData &&
                  dashboardData.reverse().map((post, index) => (
                    <div key={index} class="post my-4">
                      <div class="postDetails p-4">
                        <h2>{post.user_name}</h2>
                        <p>{post.dateCreated}</p>
                      </div>
                      <div class="postBody">
                        <p class="mb-4 px-4">{post.text}</p>
                        {/* <Image src={examplePic} layout="responsive" /> */}
                      </div>
                      <div class="postSocials p-4">
                        <p>{post.likes} likes</p>
                      </div>
                    </div>
                  ))}
                {/* Example post 1 */}
                <div class="post my-4">
                  <div class="postDetails p-4">
                    <h2>Example name</h2>
                    <p>6:20pm, September 12 2022</p>
                  </div>
                  <div class="postBody">
                    <p class="mb-4 px-4">This is a hard-coded post.</p>
                    <Image src={examplePic} layout="responsive" />
                  </div>
                  <div class="postSocials p-4">
                    <p>3 likes</p>
                  </div>
                </div>
                {/* Example post 2 */}
                <div class="post my-4">
                  <div class="postDetails p-4">
                    <h2>Example name</h2>
                    <p>6:48pm, September 12 2022</p>
                  </div>
                  <div class="postBody">
                    <p class="mb-4 px-4">
                      This is another hard-coded post. Testing overflow
                      capabilities!
                    </p>
                    <Image src={examplePic2} layout="responsive" />
                  </div>
                  <div class="postSocials p-4">
                    <p>7 likes</p>
                  </div>
                </div>
              </div>
              {/* Right column */}
              <div class="dashboard-column mx-2 w-3/12 p-4">
                <h2 class="mb-4">Your family</h2>
                <p>John Smith</p>
                <p>John Smith II</p>
                <p>John Smith III</p>
                <p>John Smith IV</p>
              </div>
            </div>,
          ]}

          {/* Content below here to show when logged out */}
          {!authorized && [
            <Hero />,
            <MainFeatures />,
            <CallToAction />,
            <Testimonials />,
            <Pricing />,
            <Faqs />,
            <Footer />,
          ]}
        </main>
      </div>
    </>
  );
}
